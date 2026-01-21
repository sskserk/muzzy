import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { HelloBlock as HelloBlockProps } from '@/payload-types'



export const HelloBlock: React.FC<HelloBlockProps> = (props) => {
  const { columns } = props



  return (

    <div className="" style={{ border: '1px solid red', alignItems: 'center', justifyContent: 'center' }}>
      {columns &&
        columns.length > 0 &&
        columns.map((col, index) => {
          const { leftMessage, rightMessage, buttonText, landMessage } = col

          return (
            <div key={index} style={{ border: '1px solid blue' }} >
              <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                border: "1px solid green",
                textTransform: 'uppercase'
              }}>
                <span>{landMessage && <RichText data={landMessage} enableGutter={false} />}</span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ border: "1px solid green" }}>
                  {leftMessage && <RichText data={leftMessage} enableGutter={false} />}
                </div>
                <div style={{ border: "1px solid green" }}>
                  {rightMessage && <RichText data={rightMessage} enableGutter={false} />}
                </div>
              </div>
              <div style={{ border: "1px solid green",
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',

               }}>
                {buttonText && <Button>{buttonText}</Button>}

                {/* {richText && <RichText data={richText} enableGutter={false} />} */}


              </div>
            </div>
          )
        })}
    </div>

  )
}
