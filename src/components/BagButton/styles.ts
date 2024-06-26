import { styled } from "../../styles"

export const BagConteiner = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 6,
    position: 'relative',
    cursor: 'pointer',
    transition: 'background color 0.2s ease-in-out',

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
    },

    variants: {
      color: {
          gray: {
              background: '$gray800',
              color: '$gray500',

              '&:not(disable):hover': {
                  color: '$green300'
              },
          },
          green: {
              background: '$green500',
              color: '$white',

              '&:not(disable):hover': {
                  background: '$green300'
              },
          }
      },
      size: {
          medium: {
              width: '3rem',   
              height: '3rem',

              svg: {
                  fontSize: 24
              },
          },
          large: {
              width: '3.5rem',   
              height: '3.5rem',

              svg: {
                  fontSize: 32
              },
          }
      }
  },

  defaultVariants: {
      color: 'gray',
      size: 'medium'
  }
})