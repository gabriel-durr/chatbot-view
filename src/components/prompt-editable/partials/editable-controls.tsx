import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, ButtonGroup, IconButton, useEditableControls } from '@chakra-ui/react'

type EditableControlsProps = {
	handleSubmit(): void
}

export const EditableControls = ({ handleSubmit }: EditableControlsProps) => {
	const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
		useEditableControls()

	return isEditing ? (
		<ButtonGroup justifyContent="center" size="sm">
			<IconButton
				aria-label="icon check"
				icon={<CheckIcon />}
				onClick={handleSubmit}
				{...getSubmitButtonProps({ onClick: handleSubmit })}
			/>
			<IconButton aria-label="icon close" icon={<CloseIcon />} {...getCancelButtonProps()} />
		</ButtonGroup>
	) : (
		<Flex justifyContent="center">
			<IconButton aria-label="icon edit" size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
		</Flex>
	)
}
