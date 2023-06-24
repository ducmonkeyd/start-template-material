// import { FileModel } from '../file/file.model';
// import { BaseModel } from '../base.model';

export enum UserRole {
  Admin = 1, //Admin
  Customer = 2, //Khách hàng
}

export class TokenModel {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class UserContextModel {
  username: string;
  password: string;
  email?: string;
  remember?: boolean;
  grant_type?: string;
  constructor() {
    this.grant_type = 'password';
  }
}

export class TokenDetailModel {
    nameid: string;
    email: string;
    fullName: string;
    sub: string;
    role: UserRole;
    roleName: string;
    iss: string;
    aud: string;
    exp: number;
    nbf: number;
  }

export class UserInfoModel {
  email: string;
  fullName: string;
  userId: string;
  userName: string;
  roleName: string;
  roles: UserRole[];
  role: UserRole;
}

export class UserProfileModel {
    userId: string;
    email: string;
    title: string;
    userName: string;
    createdDate: Date;
    zipCode: string;
    countryName: string;
    stateName: string;
    cityName: string;
    districtName: string;
    phoneNumber: string;
    surname: string;
    firstName: string;
    address: string;
    userTypeid: number;
    gender: number;
    userType: string;
    genderDisplay: string;
    position: string;
    identityNumber: string;
    dateOfBirthFormatted: Date;
    personCode: string;
    isOfflineUser: boolean;
    canResetPassword: boolean;
    dob: string;
    password: string;
    personId: string;
  }