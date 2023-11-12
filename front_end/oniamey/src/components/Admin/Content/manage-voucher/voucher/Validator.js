import { parseInt } from "lodash"

const checkLength = (name, value, min, max) => {
    if (value.length < min) {
        return `${name} không được nhỏ hơn ${min}`
    }
    if (value.length > max) {
        return `${name} không được lớn hơn ${max}`
    }
}

const checkInteger = (name, value) => {
    const number = parseFloat(value)
    if (number != value) {
        return `${name} phải là một số`
    }
    if (!Number.isInteger(number)) {
        return `${name} phải là một số nguyên`
    }
}

export { checkLength, checkInteger }