
class CustomValidation {
    

    static objectId = (value, helpers) => {

        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
            return helpers.message('"{{#label}}" must be a valid mongo id');
        }
        return value;
    };


    static password = (value, helpers) => {
        if (!value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$") && value.length < 8) {
            return helpers.message('Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )');
        }

        // if (value.length < 8) {
        //   // return helpers.message('password must be at least 8 characters ( )');
        //   return helpers.message('Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )');
        // }
        // if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        //   // return helpers.message('password must contain at least 1 letter and 1 number');
        //   return helpers.message('Password must be eight characters including one uppercase letter, one special character and alphanumeric characters ( Ex: Ps#12354 )');
        // }
        return value;
    };

}

export default CustomValidation;