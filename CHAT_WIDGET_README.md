# Chat Widget Documentation

## Обзор
Интерактивный чат-виджет для сайта Trademark Factory, который автоматически появляется в нижнем левом углу и предлагает пользователям связаться с экспертом.

## Функциональность

### Основные возможности:
- **Автоматическое появление**: Через 3 секунды после загрузки страницы показывается уведомление
- **Интерактивный чат**: Полноценный чат-интерфейс с анимациями
- **Calendly интеграция**: Встроенный виджет для записи на консультацию
- **Адаптивный дизайн**: Работает на всех устройствах
- **Анимации**: Плавные переходы с Framer Motion

### Пользовательский сценарий:
1. **Уведомление** - Через 3 сек появляется bubble с сообщением от Mike Johnson
2. **Открытие чата** - Пользователь кликает и открывается полный чат
3. **Диалог** - Пользователь вводит сообщение
4. **Calendly виджет** - Бот показывает typing indicator и встраивает Calendly для записи на звонок
5. **Запись на встречу** - Пользователь выбирает удобное время через Calendly

## Технические детали

### Компонент: `ChatWidget.tsx`
```typescript
// Календly интеграция для записи на встречи
declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: { url: string; parentElement: Element }) => void;
    };
  }
}
```

### Состояния:
- `isOpen` - открыт/закрыт чат
- `showInitialMessage` - показать начальное уведомление
- `showCalendly` - показать Calendly виджет в чате
- `isTyping` - анимация печати бота

### Анимации:
- **Появление уведомления**: slide in справа
- **Открытие чата**: scale + fade in
- **Typing indicator**: bouncing dots
- **Pulse effect**: на кнопке чата

## Настройка

### Изображение агента:
```typescript
src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
```

### Персонализация:
- **Имя агента**: Mike Johnson
- **Должность**: Trademark Specialist
- **Сообщение**: "Hi! Would you like to schedule a call about your trademark case?"

### Таймеры:
- **Показать уведомление**: 3000ms
- **Typing simulation**: 2000ms

## Стилизация

### Цветовая схема:
- **Основной**: Blue gradient (from-blue-600 to-blue-700)
- **Фон чата**: Gray-50
- **Карточки**: White с shadow-xl

### Размеры:
- **Чат-окно**: 384px width, 320px height (messages area)
- **Аватары**: 40px (уведомление), 32px (чат)
- **Кнопка чата**: 56px circle

## Интеграция

Компонент автоматически подключается ко всем страницам через `layout.tsx`:

```typescript
import ChatWidget from "@/components/ChatWidget";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

## Зависимости
- `framer-motion` - для анимаций
- `next/image` - для оптимизации изображений
- `react hooks` - useState, useEffect

## Мобильная адаптивность
- Responsive width: `max-w-[calc(100vw-2rem)]`
- Fixed positioning для всех разрешений
- Touch-friendly размеры кнопок и полей

## Безопасность
- Валидация email в форме
- Защита от XSS через Next.js
- Безопасные внешние ссылки

## Производительность
- Lazy loading изображений
- Оптимизированные анимации
- Минимальный bundle size
- Static prerendering

## Настройка для продакшена
1. Замените URL изображения на собственный
2. Настройте интеграцию с CRM
3. Добавьте аналитику событий
4. Настройте уведомления админам