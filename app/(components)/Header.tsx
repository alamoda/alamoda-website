'use client'

import { Fragment, useState, useEffect, useRef, useContext } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Category, Department, Subcategory } from '../(types)'
import axios from 'axios'
import { CartContext } from '@/context/CartContext'
import SearchPalettes from './SearchPalettes'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface Navigation {
  departments: Department[],
  pages: Page[]
}

interface Page {
  name: string,
  href: string,
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  const params = useParams()

  const [open, setOpen] = useState(false)
  const [isShowing, setIsShowing] = useState<boolean[]>([])
  const [currentShowing, setCurrentShowing] = useState<number | null>(null)

  const [navigation, setNavigation] = useState<Navigation>({ departments: [], pages: [] });

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function fetchDepartments() {
    const res = await axios.get('http://localhost:3000/api/departments?available=true');
    setNavigation({
      departments: res.data.sort((a: Department, b: Department) => a.order - b.order),
      pages: [
        { name: 'About Alamoda', href: '#' },
      ]
    });

    // Setup the hover effect
    setIsShowing(Array(res.data.length).fill(false));
  }

  const onHoverEnterMenu = (index: number) => {
    let newVals = Array(isShowing.length).fill(false);
    newVals[index] = true;
    setIsShowing(newVals)
    setCurrentShowing(index);
  };

  const onHoverExitMenu = (index: number) => {
    if (currentShowing !== index) return;
    setIsShowing(Array(isShowing.length).fill(false))
    setCurrentShowing(null);
  };

  return (
    <div className="bg-white z-40">

      {/* Search Palettes */}
      <SearchPalettes open={showSearch} toggle={setShowSearch} />

      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] overflow-x-auto">
                      {navigation.departments.map((department: Department) => (
                        <Tab
                          key={department.mongo_id}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {department.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.departments.map((department: Department, departmentIdx: number) => (
                      <Tab.Panel key={department.name} className="space-y-12 px-4 pb-6 pt-10">
                        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                          <div className="font-semibold">
                            <Link href={`/shop/${department.slug}`}>
                              View all {department.name}
                            </Link>
                          </div>
                          <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                            {department.categories.map((category: Category) =>
                              <div key={category.mongo_id}>
                                <Link href={`/shop/${department.slug}?category=${category.slug}`}
                                  id={`mobile-featured-heading-${departmentIdx}`} className="font-medium text-gray-900">
                                  {category.name}
                                </Link>
                                <ul
                                  role="list"
                                  aria-labelledby={`mobile-featured-heading-${departmentIdx}`}
                                  className="mt-6 space-y-4"
                                >
                                  {category.subcategories.map((subcategory: Subcategory) => (
                                    <li key={subcategory.mongo_id} className="flex">
                                      <Link href={`/shop/${department.slug}?category=${category.slug}&subcategories=${subcategory.slug}`} className="text-gray-500">
                                        {subcategory.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create an account
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative z-40">
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link href="/">
                      <span className="sr-only">Alamoda Inc</span>
                      <Image
                        src="/logo.png"
                        width={75}
                        height={75}
                        alt="alamoda logo"
                      />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    <Popover.Group className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.departments.map((department: Department, departmentIdx: number) => (
                          <Popover key={department.mongo_id} className="flex">
                            {({ open }) => (
                              <>
                                <div
                                  onMouseEnter={() => onHoverEnterMenu(departmentIdx)}
                                  onMouseLeave={() => onHoverExitMenu(departmentIdx)}
                                  className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      isShowing[departmentIdx]
                                        ? 'hover:text-indigo-600'
                                        : 'text-gray-700 hover:text-gray-800',
                                      params.department && params.department === department.slug
                                        ? "border-indigo-600"
                                        : "border-transparent",
                                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                    )}
                                  >
                                    <Link className="h-full w-full flex items-center justify-center" onClick={() => onHoverExitMenu(departmentIdx)} href={`/shop/${department.slug}`}>
                                      {department.name}
                                    </Link>
                                  </Popover.Button>
                                </div>

                                <Transition
                                  show={isShowing[departmentIdx]}
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel
                                    onMouseEnter={() => onHoverEnterMenu(departmentIdx)}
                                    onMouseLeave={() => onHoverExitMenu(departmentIdx)}
                                    className="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                    <div className="relative bg-white">
                                      <div className="mx-auto max-w-7xl px-8">
                                        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                          <div className="grid grid-cols-5 gap-x-8 gap-y-10">
                                            {department.categories.sort((a: Category, b: Category) => a.order - b.order).map((category: Category, categoryIdx: number) => (
                                              <div key={category.mongo_id}>
                                                <Link
                                                  onClick={() => onHoverExitMenu(departmentIdx)}
                                                  href={`/shop/${department.slug}?category=${category.slug}`}
                                                  id={`desktop-featured-heading-${categoryIdx}`}
                                                  className="font-medium text-gray-900 hover:text-gray-700 hover:underline"
                                                >
                                                  {category.name}
                                                </Link>
                                                <ul
                                                  role="list"
                                                  aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                  className="mt-6 space-y-2 sm:mt-4 sm:space-y-1"
                                                >
                                                  {category.subcategories.sort((a: Subcategory, b: Subcategory) => a.order - b.order).map((subcategory: Subcategory) => (
                                                    <li key={subcategory.mongo_id} className="flex">
                                                      <Link
                                                        onClick={() => onHoverExitMenu(departmentIdx)}
                                                        href={`/shop/${department.slug}?category=${category.slug}&subcategories=${subcategory.slug}`} className="hover:text-gray-800 hover:underline">
                                                        {subcategory.name}
                                                      </Link>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <button onClick={() => setShowSearch(true)} className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Logo (lg-) */}
                  <Link href="/" className="lg:hidden">
                    <span className="sr-only">Alamoda Inc</span>
                    <Image
                      src="/logo.png"
                      width={100}
                      height={100}
                      alt="alamoda logo"
                    />
                  </Link>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <button onClick={() => setShowSearch(true)} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {/* <div className="flex">
                          <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Account</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div> */}
                      </div>

                      <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                      <div className="flow-root">
                        <Link href="/cart" className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartProducts.length}</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav >
      </header >
    </div >
  )
}