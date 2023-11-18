import validator from 'validator';
const validateFull = (data) => {
    const msg = {};
    if (data.email !== null && data.email !== undefined) {
        if (validator.isEmpty(data.email)) {
            msg.email = "Vui lòng nhập email"
        } else {
            if (!validator.isEmail(data.email)) {
                msg.email = "Email không hợp lệ"
            }
        }
    }
    if (data.password !== null && data.password !== undefined) {
        if (validator.isEmpty(data.password)) {
            msg.password = "Vui lòng nhập mật khẩu"
        }
        else {
            if (data.password.length < 8) {
                msg.password = 'Mật khẩu phải có ít nhất 8 ký tự'
            }
        }
    }
    if (data.fullname !== null && data.fullname !== undefined) {
        if (validator.isEmpty(data.fullname)) {
            msg.fullname = "Vui lòng nhập tên"
        }
        else {
            if (validator.isNumeric(data.fullname)) {
                msg.fullname = "Tên không hợp lệ"
            }
        }
    }
    if (data.customerName !== null && data.customerName !== undefined) {
        if (validator.isEmpty(data.customerName)) {
            msg.customerName = "Vui lòng nhập tên"
        }
        else {
            if (validator.isNumeric(data.customerName)) {
                msg.customerName = "Tên không hợp lệ"
            }
        }
    }
    if (data.birthday !== null && data.birthday !== undefined) {
        if (validator.isEmpty(data.birthday)) {
            msg.birthday = "Vui lòng nhập ngày sinh"
        }
    }
    if (data.address !== null && data.address !== undefined) {
        if (validator.isEmpty(data.address)) {
            msg.address = "Vui lòng nhập địa chỉ"
        }
    }
    if (data.gender !== null && data.gender !== undefined) {
        if (validator.isEmpty(data.gender)) {
            msg.gender = "Vui lòng nhập giới tính"
        }
    }
    if (data.role !== null && data.role !== undefined) {
        if (validator.isEmpty(data.role)) {
            msg.role = "Please input Role"
        }
    }
    if (data.numberPhone !== null && data.numberPhone !== undefined) {
        if (validator.isEmpty(data.numberPhone)) {
            msg.numberPhone = "Vui lòng nhập số điện thoại"
        }
        else {
            if (!isVietnamesePhoneNumber(data.numberPhone)) {
                msg.numberPhone = "Số điện thoại không hợp lệ"
            }
        }
    }
    if (data.confirmPassword !== null && data.confirmPassword !== undefined)
        if (validator.isEmpty(data.confirmPassword)) {
            msg.confirmPassword = "Vui lòng nhập lại mật khẩu"
        }
        else {
            if (data.password !== data.confirmPassword) {
                msg.confirmPassword = "Mật khẩu không khớp"
            }
        }

    if (Object.keys(msg).length > 0) return msg
    return false
}
const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

const validateProduct = (data) => {
    const msg = {};
    if (data.get('name') !== null && data.get('name') !== undefined) {
        if (validator.isEmpty(data.get('name'))) {
            msg.name = "Please input name"
        }
    }
    if (data.get('price') !== null && data.get('price') !== undefined) {
        if (validator.isEmpty(data.get('price'))) {
            msg.price = "Please input price"
        } else {
            if (validator.isNumeric(data.get('price')) === false) {
                msg.price = "Price is number"
            }
        }
    }
    if (data.get('description') !== null && data.get('description') !== undefined) {
        if (validator.isEmpty(data.get('description'))) {
            msg.description = "Please input description"
        }
    }
    if (data.get('description') !== null && data.get('brandId') !== undefined) {
        if (data.get('brandId') === 0) {
            msg.brandId = "Please choose brandId"
        }
    }
    if (data.get('categoryId') !== null && data.get('categoryId') !== undefined) {
        if (data.get('categoryId') === 0) {
            msg.categoryId = "Please choose categoryId"
        }
    }
    if (data.get('warrantyPeriod') !== null && data.get('warrantyPeriod') !== undefined) {
        if (data.get('warrantyPeriod') === 0) {
            msg.warrantyPeriod = "Please choose warrantyPeriod"
        }
    }
    if (data.getAll('images') !== null && data.getAll('images') !== undefined) {
        if (data.getAll('images').length === 0) {
            msg.images = "Please choose images"
        } else if (data.getAll('images').length !== 2) {
            msg.images = "Please only choose 2 images"
        }
    }
    if (Object.keys(msg).length > 0) return msg
    return false
}
const validateProductR = (data) => {
    const msg = {};
    if (data.get('name') !== null && data.get('name') !== undefined) {
        if (validator.isEmpty(data.get('name'))) {
            msg.name = "Please input name"
        }
    }
    if (data.get('price') !== null && data.get('price') !== undefined) {
        if (validator.isEmpty(data.get('price'))) {
            msg.price = "Please input price"
        } else {
            if (validator.isNumeric(data.get('price')) === false) {
                msg.price = "Price is number"
            }
        }
    }
    if (data.get('description') !== null && data.get('description') !== undefined) {
        if (validator.isEmpty(data.get('description'))) {
            msg.description = "Please input description"
        }
    }
    if (data.get('description') !== null && data.get('brandId') !== undefined) {
        if (data.get('brandId') === 0) {
            msg.brandId = "Please choose brandId"
        }
    }
    if (data.get('categoryId') !== null && data.get('categoryId') !== undefined) {
        if (data.get('categoryId') === 0) {
            msg.categoryId = "Please choose categoryId"
        }
    }
    if (data.get('warrantyPeriod') !== null && data.get('warrantyPeriod') !== undefined) {
        if (data.get('warrantyPeriod') === 0) {
            msg.warrantyPeriod = "Please choose warrantyPeriod"
        }
    }
    if (data.getAll('images') !== null && data.getAll('images') !== undefined) {
        if (data.getAll('images').length === 0) {

        } else if (data.getAll('images').length !== 2) {
            msg.images = "Please only choose 2 images"
        }
    }
    if (Object.keys(msg).length > 0) return msg
    return false
}
const validateSupplier = (data) => {
    const msg = {};
    if (data.name !== null && data.name !== undefined) {
        if (validator.isEmpty(data.name)) {
            msg.name = "Please input name"
        }
        else {
            if (validator.isNumeric(data.name)) {
                msg.name = "Name is letter"
            }
        }
    }
    if (data.address !== null && data.address !== undefined) {
        if (validator.isEmpty(data.address)) {
            msg.address = "Please input Address"
        }
    }
    if (data.numberPhone !== null && data.numberPhone !== undefined) {
        if (validator.isEmpty(data.numberPhone)) {
            msg.numberPhone = "Please input Phone number"
        }
        else {
            if (!isVietnamesePhoneNumber(data.numberPhone)) {
                msg.numberPhone = "Incorrect Phone number"
            }
        }
    }

    if (Object.keys(msg).length > 0) return msg
    return false
}

const validateCategories = (data) => {
    const msg = {};
    if (data.name !== null && data.name !== undefined) {
        if (validator.isEmpty(data.name)) {
            msg.name = "Please input name"
        }
        else {
            if (validator.isNumeric(data.name)) {
                msg.name = "Name is letter"
            }
        }
    }

    if (Object.keys(msg).length > 0) return msg
    return false
}

const validateBrand = (data) => {
    const msg = {};
    if (data.name !== null && data.name !== undefined) {
        if (validator.isEmpty(data.name)) {
            msg.name = "Please input name"
        }
        else {
            if (validator.isNumeric(data.name)) {
                msg.name = "Name is letter"
            }
        }
    }
    if (Object.keys(msg).length > 0) return msg
    return false
}

const validateSalecode = (data) => {
    const msg = {};
    if (data.name !== null && data.name !== undefined) {
        if (validator.isEmpty(data.name)) {
            msg.name = "Please input name"
        }
        else {
            if (validator.isNumeric(data.name)) {
                msg.name = "Name is letter"
            }
        }
    }
    if (data.startDate !== null && data.startDate !== undefined) {
        if (validator.isEmpty(data.startDate)) {
            msg.startDate = "Please input start date"
        }
    }
    if (data.endDate !== null && data.endDate !== undefined) {
        if (validator.isEmpty(data.endDate)) {
            msg.endDate = "Please input end date"
        }
    }
    if (data.percent !== null && data.percent !== undefined) {
        if (data.percent === 0) {
            msg.percent = "Please input percent"
        } else if (data.percent < 0) {
            msg.percent = "Please input percent > 0"
        } else if (data.percent > 50) {
            msg.percent = "Please input percent <= 50"
        }
    }
    if (Object.keys(msg).length > 0) return msg
    return false
}
const validatePurchase = (data) => {
    const msg = {};
    if (data.supplierId !== null && data.supplierId !== undefined) {
        if (data.supplierId === 0) {
            msg.supplierId = "Please input name supplier"
        }
    }
    if (Object.keys(msg).length > 0) return msg
    return false
}
const validatePurchaseDetails = (data) => {
    const msg = {};
    if (data.productId !== null && data.productId !== undefined) {
        if (data.productId === 0) {
            msg.productId = "Please choose product"
        }
    }
    if (data.price !== null && data.price !== undefined) {
        if (data.price === 0) {
            msg.price = "Please input price"
        } else if (data.price < 0) {
            msg.price = "Please input price > 0"
        }
    }
    if (data.count !== null && data.count !== undefined) {
        if (data.count === 0) {
            msg.count = "Please input count"
        } else if (data.count < 0) {
            msg.count = "Please input count > 0"
        }
    }
    if (Object.keys(msg).length > 0) return msg
    return false
}
export {
    validateFull,
    isVietnamesePhoneNumber,
    validateProduct,
    validateProductR,
    validateSupplier,
    validateCategories,
    validateBrand,
    validateSalecode,
    validatePurchase,
    validatePurchaseDetails
}
