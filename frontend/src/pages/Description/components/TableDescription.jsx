import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TableDescription({ listDescriptionColumns }) {
  return (
    <div>
      <Table>
        <TableCaption>Lista de descripción de un objeto.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">Nro</TableHead>
            <TableHead>Nombre columna</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Nombre de propiedad</TableHead>
            <TableHead className="w-[20px]">col</TableHead>
            <TableHead className="w-[20px]">minor</TableHead>
          </TableRow>
        </TableHeader>

        {listDescriptionColumns.length > 0 && (
          <TableBody>
            {listDescriptionColumns.map((item, index) => (
              <TableRow key={item.column_id}>
                <TableCell className="w-[20px]">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.property_name}</TableCell>
                <TableCell className="w-[20px]">{item.column_id}</TableCell>
                <TableCell className="w-[20px]">{item.minor_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  )
}
