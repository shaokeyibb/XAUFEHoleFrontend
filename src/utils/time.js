// timestamp within a second
export function toReadableRelativeTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0 || months > 0 || days > 0) {
        return date.toLocaleTimeString()
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
