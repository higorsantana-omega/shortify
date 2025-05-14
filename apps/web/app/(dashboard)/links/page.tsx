import { getLinks } from '../../../lib/actions/data/links'
import { LinkHeader } from './_components/link-header'
import { LinksList } from './_components/links-list'

import { NewLinkModal } from './_components/modals/new-link-modal'

export default async function LinksPage() {
  const result = await getLinks()

  return (
    <>
      <LinkHeader />

      <NewLinkModal />

      <LinksList response={result} />
    </>
  )
}
