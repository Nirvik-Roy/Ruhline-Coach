// utils/dateUtils.js

export const toLocalTime = (utcString) => {
    return new Date(utcString).toLocaleString('en-IN', {
        timeZone: 'utc',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const toLocalDate = (utcString) => {
    return new Date(utcString).toLocaleString('en-IN', {
        timeZone: 'utc',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

export const toLocalDateTime = (utcString) => {
    return new Date(utcString).toLocaleString('en-IN', {
        timeZone: 'utc',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};