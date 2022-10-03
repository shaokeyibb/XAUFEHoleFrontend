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
