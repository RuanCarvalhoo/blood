import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface MascotProps {
  size?: number;
  expression?: 'happy' | 'wink' | 'neutral';
}

export default function Mascot({ size = 150, expression = 'happy' }: MascotProps) {
  const scale = size / 150;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Corpo da Gota */}
      <View style={[styles.body, { transform: [{ rotate: '-45deg' }, { scale }] }]}>
        {/* Brilho/Reflexo */}
        <View style={styles.shine} />
        
        {/* Rosto (desrotacionado) */}
        <View style={styles.faceContainer}>
          <View style={styles.eyesRow}>
             {/* Olho Esquerdo */}
            <View style={styles.eye}>
              <View style={styles.pupil} />
            </View>
            
             {/* Olho Direito (Muda com expressão) */}
            {expression === 'wink' ? (
               <View style={styles.winkEye} />
            ) : (
              <View style={styles.eye}>
                <View style={styles.pupil} />
              </View>
            )}
          </View>
          
          {/* Boca */}
          <View style={styles.mouth} />
        </View>
      </View>
      
      {/* Gotinhas pingando (opcional, decorativo) */}
      <View style={[styles.drip, { top: size * 0.85, left: size * 0.5, width: size * 0.08, height: size * 0.08 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 10, // A ponta da gota
    borderWidth: 4,
    borderColor: COLORS.primaryDark, // Borda escura cartoon
    justifyContent: 'center',
    alignItems: 'center',
  },
  shine: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  faceContainer: {
    transform: [{ rotate: '45deg' }], // Compensa a rotação do corpo
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyesRow: {
    flexDirection: 'row',
    gap: 25,
    marginBottom: 10,
  },
  eye: {
    width: 28,
    height: 36,
    backgroundColor: COLORS.dark,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pupil: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    top: 6,
    right: 6,
  },
  winkEye: {
    width: 28,
    height: 36,
    borderBottomWidth: 6,
    borderBottomColor: COLORS.dark,
    borderRadius: 14,
    marginTop: -10, // Ajuste visual
  },
  mouth: {
    width: 30,
    height: 15,
    borderBottomWidth: 5,
    borderBottomColor: COLORS.dark,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  drip: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  }
});