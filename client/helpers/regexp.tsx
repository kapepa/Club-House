const Regexp = {
  name: /^[ a-zA-Z\-\’]{3,}$/,
  phone: /^[0-9]{2}[-\s\.][(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{2}[-\s\.]{0,1}[0-9]{2}$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^[a-zA-Z0-9!@#$%^&*]{6,30}$/,
}

export default Regexp;