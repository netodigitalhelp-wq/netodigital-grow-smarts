const PHONE = "0525981030";
const PHONE_DISPLAY = "052-598-1030";
const EMAIL = "netodigital.help@gmail.com";

export const contact = {
  phone: PHONE,
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:+972${PHONE.slice(1)}`,
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  whatsappHref: `https://wa.me/972${PHONE.slice(1)}?text=${encodeURIComponent("היי נטו-דיגיטל, מילאתי את השאלון באתר ואשמח להתקדם להקמה ללא עלות.")}`,
  area: "שירות בכל הארץ — אונליין",
};