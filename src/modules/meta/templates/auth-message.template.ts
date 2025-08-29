export const formatAuthTemplate = ({ phone_number, code }) => {
  return {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": `${phone_number}`,
    "type": "template",
    "template": {
        "name": "authentication_code_copy_code_button",
        "language": {
        "code": "pt_BR"
        },
        "components": [
        {
            "type": "body",
            "parameters": [
            {
                "type": "text",
                "text": `${code}`
            }
            ]
        },
        {
            "type": "button",
            "sub_type": "url",
            "index": "0",
            "parameters": [
            {
                "type": "text",
                "text": `${code}` 
            }
            ]
        }
        ]
    }
    }
};
