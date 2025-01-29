export const isValidForm = (formValues) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isMailValid = true;
    const nonField = [];
    for (const key in formValues) {
        const value = formValues[key];
        if (key === 'username' && !emailRegex.test(value)) {
            nonField.push(key);
            isMailValid = false;
        }
        else if (!value.length) {
            nonField.push(key);
        }
    }
    return [nonField, isMailValid];
};
