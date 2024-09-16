
const validationSchema={
    username:{
        isLength:{
            options:{
                min:3,
                max:10
            },
            errorMessage:"username should contain between 3 and 10 charachters"
        },
        notEmpty:true,
        isString:true
    },
    email:{
        notEmpty:true,
        isString:true,
    },
    password:{
        notEmpty:true,
        isLength:{
            options:{
                min:6,
                max:15
            },
            errorMessage:"password should contain between 6 and 15 charachters"
        }
    }
}
export default validationSchema