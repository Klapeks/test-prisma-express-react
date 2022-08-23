
const Utils = {
    equals(o1: any, o2: any): boolean {
        if (typeof o1 !== 'object') return o1 === o2;
        if (typeof o2 !== 'object') return false;
        if (Object.keys(o1).length !== Object.keys(o2).length) return false;
        return Object.keys(o1).every(val => Utils.equals(o1[val], o2[val]));
    }
}

export default Utils