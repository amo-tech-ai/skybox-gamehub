
---

# ✅ Prompt for Lovable

**Add WhatsApp confirmation on event signup**

> Implement a WhatsApp confirmation message workflow.
>
> **Goal:** When a user signs up for an event (submits the event registration form), automatically send them a WhatsApp confirmation message.
>
> **Tasks:**
>
> 1. Create or update an API route (similar to my existing `newsletter-confirmation` function) that receives:
>
>    * `name`
>    * `phone`
>    * `eventName`
>    * `eventDate`
> 2. Use my Twilio environment variables:
>
>    * `TWILIO_ACCOUNT_SID`
>    * `TWILIO_AUTH_TOKEN`
>    * `TWILIO_WHATSAPP_FROM`
> 3. Format the WhatsApp message like this:
>
>    ```
>    ¡Hola {name}! 👋  
>    Gracias por registrarte al evento **{eventName}**.  
>    📅 Fecha: {eventDate}  
>    Te enviaremos recordatorios y novedades por WhatsApp.  
>    ¡Nos vemos en Skybox! 🍻  
>    ```
> 4. Trigger this API route right after the event signup form is submitted.
> 5. Show a success toast in the UI when the message is sent.
>
> **Do not break existing newsletter logic.
> Add this as a separate event-confirmation function.**

---
 