import React from 'react'
import styled from "@emotion/styled"

interface DividerProps {
    lineStyle?: 'solid' | 'dashed'
}

const DividerStyled = styled('hr')<DividerProps>`
  border-top: ${props => props.lineStyle === 'dashed' ? '3px dashed #bbb' : '3px solid #bbb'};
  margin: 10px;
`;

export const Divider: React.FC<DividerProps> = React.memo((props) => {
    const {lineStyle} = props
    console.log('DIVIDER')
  return (
    <DividerStyled lineStyle={lineStyle}/>
  )
})

Divider.defaultProps = {
  lineStyle: 'solid'
}



