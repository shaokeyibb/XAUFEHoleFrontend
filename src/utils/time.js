// timestamp within a second
export function toReadableRelativeTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp * 1000);
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
        return years + " 年以前";
    }
    if (months > 0) {
        return months + " 个月以前";
    }
    if (days > 0) {
        return days + " 天前";
    }
    if (hours > 0) {
        return hours + " 小时前";
    }
    if (minutes > 0) {
        return minutes + " 分钟前";
    }
    if (seconds > 0) {
        return seconds + " 秒前";
    }
    return "刚刚";
}
