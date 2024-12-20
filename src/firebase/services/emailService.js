import emailjs from '@emailjs/browser';

export const sendResponseEmail = async (to_name, to_email, original_message, response_message) => {
    const templateParams = {
        to_name,
        to_email,
        original_message,
        response_message
    };

    try {
        const result = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_RESPONSE_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return { success: true, result };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};
