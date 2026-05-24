import { Component, ChangeDetectionStrategy, signal, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService, ChatMessage } from '../../core/chatbot.service';

@Component({
  selector: 'app-chatbot',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class ChatbotComponent {
  private readonly chatbotService = new ChatbotService();

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

  protected readonly isOpen = signal(false);
  protected readonly isLoading = signal(false);
  protected readonly messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! 🥑 Soy Vitta Bot, tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo darte información sobre nuestros postres keto, precios, ingredientes, envíos o políticas.',
    },
  ]);

  protected toggleChat(): void {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.scrollToBottom();
    }
  }

  protected async handleSend(inputElement: HTMLInputElement): Promise<void> {
    const text = inputElement.value.trim();
    if (!text || this.isLoading()) return;

    // Clear input field immediately
    inputElement.value = '';

    // Add user message to UI
    this.messages.update((history) => [...history, { role: 'user', content: text }]);
    this.scrollToBottom();

    // Set loading state
    this.isLoading.set(true);

    try {
      // Map current messages to service format (exclude system if not needed)
      const serviceHistory = this.messages()
        .filter(m => m.content !== '')
        .map(
          (m) =>
            ({
              role: m.role,
              content: m.content,
            } as ChatMessage)
        );

      // Get reply from service
      const reply = await this.chatbotService.sendMessage(text, serviceHistory);

      // Add assistant response to UI
      this.messages.update((history) => [...history, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error(e);
      this.messages.update((history) => [
        ...history,
        {
          role: 'assistant',
          content: 'Lo siento, experimenté una dificultad técnica. Por favor, intenta de nuevo.',
        },
      ]);
    } finally {
      this.isLoading.set(false);
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 50);
  }
}
