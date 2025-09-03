import { SuccessMessagesEN } from "./languages/en";
import { SuccessMessagesPT } from "./languages/pt";

type SupportedLangs = 'pt' | 'en';

const messages = {
  pt: SuccessMessagesPT,
  en: SuccessMessagesEN,
};

export function getMessages(lang: SupportedLangs = 'pt') {
  return messages[lang];
}
