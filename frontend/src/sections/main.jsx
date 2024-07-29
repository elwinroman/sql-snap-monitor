import { Route, Routes } from 'react-router-dom'
import { DefinitionObject } from '@/components/definition-object'
import { DescriptionObject } from '@/components/description-object'
function Error() {
  return <div>Error 404</div>
}

function Home() {
  return <div>Home</div>
}

export function Main({ object, updateNameObject }) {
  return (
    <section className="flex-[1_0_auto]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/definition"
          element={
            <DefinitionObject
              object={object}
              updateNameObject={updateNameObject}
            />
          }
        />
        <Route path="/description" element={<DescriptionObject />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </section>
  )
}
