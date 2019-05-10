import { Parameters } from './models'
export function stringifyParams(params: Parameters): string {
    const parts: string[] = []
    for (const param in params) {
        let part = param
        if (typeof params[param] !== 'undefined') {
            part += `=${params[param]}`
        }
        parts.push(part)
    }
    return parts.join('&');
}
