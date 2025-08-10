import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '../../utils/classNames'
import { useColorScheme } from '../../hooks/useColorScheme'
import Button from './Button'

/**
 * Luxury Modal Component with dynamic color scheme integration
 * Automatically adapts to all 24 TUHME color palettes
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  className,
  titleClassName,
  contentClassName,
  actions,
  ...props
}) => {
  const { isLightPalette, getContrastSafeTextColor } = useColorScheme()

  // Size configurations
  const sizeConfig = {
    xs: 'max-w-md',
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4',
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeOnBackdrop ? onClose : () => {}}
        {...props}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-luxury" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'w-full transform overflow-hidden text-left align-middle transition-all',
                  sizeConfig[size],
                  className
                )}
              >
                <div
                  className={cn(
                    'glass-luxury-dark rounded-luxury-xl border shadow-luxury-3xl',
                    isLightPalette() 
                      ? 'border-black/10 bg-white/95 backdrop-blur-luxury' 
                      : 'border-white/10',
                    contentClassName
                  )}
                >
                  {/* Header */}
                  {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                      {title && (
                        <Dialog.Title
                          as="h3"
                          className={cn(
                            'text-lg font-semibold leading-6',
                            getContrastSafeTextColor(),
                            titleClassName
                          )}
                        >
                          {title}
                        </Dialog.Title>
                      )}
                      
                      {showCloseButton && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={onClose}
                          className="ml-auto"
                          aria-label="Close modal"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {children}
                  </div>

                  {/* Actions */}
                  {actions && (
                    <div className="flex items-center justify-end space-x-3 p-6 border-t border-white/10">
                      {actions}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

/**
 * Confirmation Modal
 */
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  ...props
}) => {
  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose}>
        {cancelText}
      </Button>
      <Button variant={variant} onClick={handleConfirm}>
        {confirmText}
      </Button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      actions={actions}
      {...props}
    >
      <p className="text-white/80">
        {message}
      </p>
    </Modal>
  )
}

/**
 * Alert Modal
 */
export const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  variant = 'primary',
  buttonText = 'OK',
  ...props
}) => {
  const actions = (
    <Button variant={variant} onClick={onClose}>
      {buttonText}
    </Button>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      actions={actions}
      {...props}
    >
      <p className="text-white/80">
        {message}
      </p>
    </Modal>
  )
}

/**
 * Loading Modal
 */
export const LoadingModal = ({
  isOpen,
  title = 'Loading...',
  message = 'Please wait while we process your request.',
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // Prevent closing during loading
      title={title}
      size="sm"
      showCloseButton={false}
      closeOnBackdrop={false}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <p className="text-white/80">
          {message}
        </p>
      </div>
    </Modal>
  )
}

/**
 * Form Modal Wrapper
 */
export const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isSubmitting = false,
  submitDisabled = false,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
        {cancelText}
      </Button>
      <Button 
        variant="primary" 
        type="submit"
        form="modal-form"
        loading={isSubmitting}
        disabled={submitDisabled}
      >
        {submitText}
      </Button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={actions}
      {...props}
    >
      <form id="modal-form" onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  )
}

/**
 * Image Modal for galleries
 */
export const ImageModal = ({
  isOpen,
  onClose,
  src,
  alt,
  title,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
      {...props}
    >
      <div className="flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[70vh] object-contain rounded-luxury"
        />
      </div>
    </Modal>
  )
}

/**
 * Sidebar Modal (slides from right)
 */
export const SidebarModal = ({
  isOpen,
  onClose,
  title,
  children,
  width = 'md',
  ...props
}) => {
  const widthConfig = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose} {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-luxury" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={cn(
                  'pointer-events-auto w-screen',
                  widthConfig[width]
                )}>
                  <div className="flex h-full flex-col bg-global-gradient shadow-luxury-3xl">
                    {/* Header */}
                    {title && (
                      <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <Dialog.Title className="text-lg font-semibold text-white">
                          {title}
                        </Dialog.Title>
                        <Button variant="ghost" size="icon-sm" onClick={onClose}>
                          <XMarkIcon className="h-5 w-5" />
                        </Button>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal