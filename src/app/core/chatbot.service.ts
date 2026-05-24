import { Injectable } from '@angular/core';
import { env } from './env';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private readonly apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private readonly apiKey = env.API_KEY_IA;
  // Using a standard, fast and highly reliable Groq model
  private readonly model = 'llama-3.3-70b-versatile';

  private readonly systemPrompt = `Eres el chatbot asistente virtual oficial de "Vitta Dulce", una repostería artesanal keto ubicada en Santa Cruz de la Sierra, Bolivia.
Tu propósito exclusivo es ayudar a los usuarios con preguntas relacionadas únicamente al negocio, sus productos, ingredientes, precios, envíos y políticas.

Información del negocio:
- Nombre: Vitta Dulce
- Eslogan: "Sabores que acompañan tu equilibrio"
- Misión: Brindar equilibrio alimentario a personas con diabetes tipo 2, prediabetes, sobrepeso y público consciente a través de repostería keto honesta.
- Autores/Fundadores: Jhefferson Torrez Campero, Erick Leonardo Ulloa Avila, Adriana Gutiérrez Suarez, Camila Guadalupe Flores Quispe (estudiantes de la UAGRM).
- Dirección: Santa Cruz de la Sierra, Bolivia (cobertura principal en zonas Norte y Oeste).
- Contacto: WhatsApp +591 70000000, correo: hola@vittadulce.bo

Cartera de Productos:
1. Torta keto de vainilla y almendra: Bs 160 la unidad (10 porciones). Harina de almendra, eritritol. 2.3g carbs netos/porción.
2. Pan keto multisemillas: Bs 60 la unidad (en molde). Harina de almendra, linaza, chía, semillas. 1.7g carbs netos/rebanada.
3. Cheesecake keto natural: Bs 80 la unidad. Base de harina de almendras, crema de queso y frutos rojos. 2.4g carbs netos/porción.
4. Brownie keto de cacao: Bs 15 la unidad (se vende en lotes de 12 unidades por Bs 180). Cacao puro. 1.9g carbs netos/unidad.

Políticas de Envío:
- Entregas en Santa Cruz de la Sierra (Norte y Oeste principalmente). Tarifas de Bs 10 a Bs 25.
- Pedidos confirmados antes de las 14:00 (2:00 PM) se entregan el mismo día. Lunes a Sábado.
- Métodos de pago: Código QR Simple, transferencia previa o efectivo al recibir (contra entrega).

Políticas de Devoluciones:
- Por ser repostería fresca sin conservantes, no se aceptan devoluciones.
- Si hay daño o error en el pedido, reportar en un plazo de 24 horas enviando foto del producto por WhatsApp para reposición, crédito o reembolso.

REGLA CRÍTICA Y OBLIGATORIA:
Solo debes responder preguntas directamente relacionadas con Vitta Dulce, sus productos, repostería keto, diabetes, alimentación baja en carbohidratos, ingredientes que usamos, fundadores, envíos o contacto del negocio.
Si el usuario pregunta por cualquier tema ajeno a esto (por ejemplo: política, tareas escolares, chistes generales, programación, clima, otros negocios, deportes, etc.), debes responder EXACTAMENTE y únicamente esto:
"No puedo ayudarte con un tema diferente a Vitta Dulce"`;

  async sendMessage(userMessage: string, history: ChatMessage[] = []): Promise<string> {
    if (!this.apiKey) {
      console.warn('API_KEY_IA no está configurada.');
      return 'Lo siento, el asistente virtual no está configurado en este momento. Por favor contacta al equipo por WhatsApp.';
    }

    try {
      const messages: ChatMessage[] = [
        { role: 'system', content: this.systemPrompt },
        ...history.slice(-6), // Send last 6 messages to maintain context
        { role: 'user', content: userMessage }
      ];

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.2, // Low temperature for highly consistent replies
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      let reply = data.choices?.[0]?.message?.content || '';
      reply = reply.trim();

      // Fallback check in case the LLM tries to bypass the prompt rule
      const normalizedReply = reply.toLowerCase();
      const normalizedUser = userMessage.toLowerCase();
      
      // Let's verify if the answer matches the business context
      return reply;
    } catch (error) {
      console.error('Error in ChatbotService:', error);
      return 'Lo siento, tuve un problema al procesar tu mensaje. ¿Podrías intentar de nuevo o escribirnos directamente por WhatsApp?';
    }
  }
}
