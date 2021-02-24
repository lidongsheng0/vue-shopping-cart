export function IsEmail(str) {
	var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return reg.test(str);
}

export function IsPassword(password) {
	var reg = /[a-zA-Z]/;
	return reg.test(password);
}
