export const preSaveWheels = [
    {
        name: 'Default',
        colors: ['#006d77', '#83c5be', '#ffddd2', '#e29578'],
        nextValue: ((num) => {
          return `Choice ${num}`
        }),
        segments: [
          {
            name: 'sv-1',
            text: 'Choice 1',
            value: 33.3333,
            color: '#006d77',
            isFocus: false,
          },
          {
            name: 'sv-2',
            text: 'Choice 2',
            value: 33.3333,
            color: '#83c5be',
            isFocus: false,
          },
          {
            name: 'sv-3',
            text: 'Choice 3',
            value: 33.3333,
            color: '#ffddd2',
            isFocus: false,
          },
        ]
    },
    {
        name: 'Yes or No',
        colors: ['#60d394', '#ee6055'],
        nextValue: (num) => {
          const choices = ['Yes', 'No']
          return choices[num % choices.length]
        },
        segments: [
            {
                name: 'sv-1',
                text: 'Yes',
                value: 50,
                color: '#60d394',
                isFocus: false,
              },
              {
                name: 'sv-2',
                text: 'No',
                value: 50,
                color: '#ee6055',
                isFocus: false,
              },
        ]
    },
    {
        name: 'D6 die',
        colors: ['#C0C0C0', '#EBEBEB'],
        nextValue: (num) => {
          return String(num)
        },
        segments: [
            {
                name: 'sv-1',
                text: '1',
                value: 16.66666667,
                color: '#C0C0C0',
                isFocus: false,
              },
              {
                name: 'sv-2',
                text: '2',
                value: 16.66666667,
                color: '#EBEBEB',
                isFocus: false,
              },
              {
                name: 'sv-3',
                text: '3',
                value: 16.66666667,
                color: '#C0C0C0',
                isFocus: false,
              },
              {
                name: 'sv-4',
                text: '4',
                value: 16.66666667,
                color: '#EBEBEB',
                isFocus: false,
              },
              {
                name: 'sv-5',
                text: '5',
                value: 16.66666667,
                color: '#C0C0C0',
                isFocus: false,
              },
              {
                name: 'sv-6',
                text: '6',
                value: 16.66666667,
                color: '#EBEBEB',
                isFocus: false,
              },
        ],
    },
    {
      name: 'Heads or Tails',
      colors: ['#D4AF37', '#D3D3D3'],
      nextValue: (num) => {
        const choices = ['Heads', 'Tails']
        return choices[num % choices.length]
      },
      segments: [
          {
              name: 'sv-1',
              text: 'Heads',
              value: 50,
              color: '#D4AF37',
              isFocus: false,
            },
            {
              name: 'sv-2',
              text: 'Tails',
              value: 50,
              color: '#D3D3D3',
              isFocus: false,
            },
      ]
  },
]