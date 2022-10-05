const anonymousName = [
    'Addison',
    'Brianna',
    'Colette',
    'Demi',
    'Ellie',
    'Faith',
    'Gina',
    'Hope',
    'Irene',
    'Jenna',
    'Kira',
    'Lexie',
    'Maya',
    'Norah',
    'Orli',
    'Paloma',
    'Quinn',
    'Reina',
    'Sadie',
    'Tabitha',
    'Unique',
    'Verity',
    'Willa',
    'Xiomara',
    'Yvie',
    'Zora'
]

function getAnonymousNameByIndex(index) {
    let remain = index
    let name = ''
    while (remain >= anonymousName.length) {
        remain -= anonymousName.length
        name += ' ' + anonymousName[remain % anonymousName.length]
    }
    if (remain < anonymousName.length) {
        return (name + ' ' + anonymousName[remain]).trim()
    }
}

export function getFullPosterNameByIndex(index) {
    if (index < 0) {
        return "洞主"
    } else {
        return getAnonymousNameByIndex(index)
    }
}

export function getQueryVariable(variable) {
    if (window.location.href.split('?').length <= 1) return undefined;
    let query = window.location.href.split('?')[1];
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return undefined;
}

export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
