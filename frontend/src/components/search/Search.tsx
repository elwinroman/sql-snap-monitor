import { dialogSearchContext } from '@sqldefinition/contexts/dialogSearchContext'
import { Search as SearchIcon } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui'

import { Results } from './components/results/Results'
import { searchContext } from './context/searchContext'

export function Search() {
  const { updateQuerySearch, debounceGetSuggestions, updateSuggestions } = searchContext()
  const { open, updateOpen } = dialogSearchContext()

  const handleSearchByTiping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value

    if (newSearch.length > 2) debounceGetSuggestions(newSearch)
    else updateSuggestions([])

    updateQuerySearch(newSearch)
  }

  const handleOpenChange = (isOpen: boolean) => {
    updateOpen(isOpen)
    if (!isOpen) {
      updateQuerySearch('')
      updateSuggestions([])
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="bg-background shadow-custom-dialog flex h-[60%] flex-col gap-1 overflow-hidden p-0 sm:max-w-2xl"
          showCloseButton={false}
        >
          <DialogHeader className="py-1">
            <DialogTitle>
              <div className="flex items-center gap-2 px-3">
                <SearchIcon size={16} className="text-secondary" />
                <input
                  className="text-primary placeholder:text-muted flex h-8 w-full rounded-sm bg-transparent text-base font-normal file:bg-transparent placeholder:text-sm placeholder:font-normal focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-5"
                  placeholder="Escribe el nombre del objeto"
                  spellCheck={false}
                  onChange={handleSearchByTiping}
                />
              </div>
            </DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>

          {/* Separador */}
          <div className="bg-border -mx-1 h-px"></div>

          {/* Body card */}
          <Results />

          {/* <footer className="h-10">Footer</footer> */}
        </DialogContent>
      </Dialog>
    </>
  )
}
