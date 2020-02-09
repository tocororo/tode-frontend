import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Segment, Icon, Header } from 'semantic-ui-react';
import styled from 'styled-components'

const MyIcon = styled(Icon)`
  &&& {
   color: #1d314d;
  }
`

function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsBinaryString(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
        <Segment placeholder >
            <Header icon>
            <input {...getInputProps()} />
            <MyIcon size='big' name='pdf file outline' />
            Si ya tiene un archivo listo para subir arrastrelo hasta aqui
            </Header>
        </Segment>
    </div>
  )
}

export default Dropzone