import React from 'react'
import styled from "@emotion/styled"

interface IDividerProps {
    lineStyle?: 'solid' | 'dashed'
}

const DividerStyled = styled('hr')<IDividerProps>`
  border-top: ${props => props.lineStyle === 'dashed' ? '3px dashed #bbb' : '3px solid #bbb'};
  margin: 10px;
`;

export const Divider: React.FC<IDividerProps> = React.memo((props) => {
    const {lineStyle} = props

  return (
    <DividerStyled lineStyle={lineStyle} />
  )
})

Divider.defaultProps = {
  lineStyle: 'solid'
}



