const DateUtils = {
    formatting(date: any, fmt: string = "yyyy-MM-dd HH:mm:ss") {
        const dict: any = {
            yyyy: date.getFullYear(),
            M: date.getMonth() + 1,
            d: date.getDate(),
            H: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            MM: ("" + (date.getMonth() + 101)).slice(1),
            dd: ("" + (date.getDate() + 100)).slice(1),
            HH: ("" + (date.getHours() + 100)).slice(1),
            mm: ("" + (date.getMinutes() + 100)).slice(1),
            ss: ("" + (date.getSeconds() + 100)).slice(1)
        };
        return fmt.replaceAll(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function (substring: string, ...arguments_: any[]) {
            return dict[arguments_[0]];
        });
    }
};

export default DateUtils;
