import { environment } from '../../environments/environment';
import { Location } from '@angular/common';

export class Util {
    public static apiAuthUrl(path) {
        const url1 = Location.joinWithSlash(environment.api_url, 'api/auth');
        return Location.joinWithSlash(url1, path);
    }

    public static apiPublicUrl(path) {
        const url1 = Location.joinWithSlash(environment.api_url, 'api/public');
        return Location.joinWithSlash(url1, path);
    }

    public static apiPhotoUrl(path) {
        if (path) {
            if (path.indexOf('://') > 0 || path.indexOf('//') === 0) {
                return path;
            }
            return Location.joinWithSlash(environment.api_url, path);
        }
    }

    public static deepCopy<T>(object: T): T {
        return object ? <T> JSON.parse(JSON.stringify(object)) : null;
    }

    public static charToString(val: number): string {
        return String.fromCharCode(70 - val - (val && 1));
    }

    public static gotoHome(): void {
        location.href = environment.home_path;
    }

    public static defaultPhotoUrl() {
        const path = 'assets/images/user.png';
        return Location.joinWithSlash(environment.app_url, path);
    }
}
