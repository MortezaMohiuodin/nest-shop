import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { bcrypt } from 'bcryptjs';
import { User } from '../user/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import {
  PasswordResetToken,
  PasswordResetTokenDocument,
} from './schema/password-reset-token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(PasswordResetToken.name)
    private passwordResetTokenModel: Model<PasswordResetTokenDocument>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(loginDto: LoginDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(loginDto.password, 10);
    const user = await this.userService.create({
      email: loginDto.email,
      password: hashedPassword,
    });
    return this.login(user);
  }
  async requestPasswordReset(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    const token = this.jwtService.sign({ email });
    await this.passwordResetTokenModel.create({ email, token });
    //TODO Here, send an email with the reset link containing the token (not implemented)
    return { message: 'Password Reset link send' };
  }
  async resetPassword(token: string, newPassword: string) {
    const resetToken = await this.passwordResetTokenModel.findOne({
      token,
      used: false,
    });
    if (!resetToken)
      throw new BadRequestException('Invalid or expired password reset token');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updatePassword(resetToken.email, hashedPassword);
    resetToken.used = true;
    await resetToken.save();
    return { message: 'Password successfully reset' };
  }
}
