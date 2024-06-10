import { useCursorify } from "cursorify";

const EmojiCursor = () => {
  const { mouseState, style } = useCursorify();

  return (
    <div style={{
      width: 40,
      height: 40,
      fontSize: 30,
      position: 'absolute',  // Posicionar absolutamente sobre otros contenidos
      left: mouseState.x,    // Posición horizontal basada en el estado del mouse
      top: mouseState.y,     // Posición vertical basada en el estado del mouse
      pointerEvents: 'none', // Asegura que el cursor no interfiera con otros eventos del mouse
      userSelect: 'none'     // Previene la selección del texto del cursor
    }}>
      {(() => {
        if (mouseState === 'mouseDown') return '✊';
        if (style === 'pointer') return '👆';
        return '🖐️';  // Default
      })()}
    </div>
  );
};

export default EmojiCursor;
