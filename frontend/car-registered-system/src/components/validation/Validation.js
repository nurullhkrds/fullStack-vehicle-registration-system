import * as yup from 'yup';

export  const validationsRegistered=yup.object().shape({
    name:yup
    .string().min(5,"İsim minimum 5 karakter uzunluğunda olmalıdır.")
    ,
    lastName:yup
    .string().min(5,"Soyisim minimum 5 karakter uzunluğunda olmalıdır.")
    ,
    userName: yup
    .string()
    .min(4, 'Kullanıcı adı minimum 3 karakter uzunluğunda olmalıdır')
    .required('Kullanıcı adı zorunludur'),
    password:yup.string().min(5,"Parolanız en az 5 karakterden oluşabilir."),
    passwordConfirm:yup.string().oneOf([yup.ref('password')],'Parolalar uyuşmuyor')
    .required("Parola zorunludur")
})


export  const changePasswordValidation=yup.object().shape({
   
    
    oldPassword:yup.string().min(5,"Parolanız en az 5 karakterden oluşabilir.").required("Bu alan zorunludur."),
    password:yup.string().min(5,"Parolanız en az 5 karakterden oluşabilir."),
    passwordConfirm:yup.string().oneOf([yup.ref('password')],'Parolalar uyuşmuyor')
    .required("Parola zorunludur")
})



export  const validationsLogin=yup.object().shape({
    userName: yup
    .string()
    .min(4, 'Kullanıcı adı minunmum 3 karakter uzunluğunda olmalıdır')
    .required('Kullanıcı adı zorunludur'),
    password:yup.string().min(5,"Parolanız en az 5 karakterden oluşabilir.").required("Parola zorunludur"),

})


export const validationsAddNewCar=yup.object().shape({
    carName:yup
    .string().min(6,"Araç adı minimum 6 karakter olmalıdır.").required("Bu Alan zorunludur"),
    brand:yup
    .string().required("Bu Alan zorunludur"),
    model:yup
    .string()
    ,
    year:yup
    .string().min(4,"Yıl minimum 4 karakter olmalıdır").max(4,"Yıl 4 karakterden fazla olamaz").required("Bu Alan zorunludur"),
    plaka:yup
    .string().min(8,"Plaka minimum 8 karakter olmalıdır").required("Bu Alan zorunludur")

})