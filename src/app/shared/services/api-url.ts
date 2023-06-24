import { environment } from '@env/environment';

export class ApiUrl {
    static BaseUrl = environment.serverUrl
    public static Login = ApiUrl.BaseUrl + 'token';
}
