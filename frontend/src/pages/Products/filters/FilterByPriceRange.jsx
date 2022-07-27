import { RangeSlider, Stack, TextField } from '@shopify/polaris'
import { useCallback, useState } from 'react'

export default function FilterByPriceRange() {
  const initialValue = [1000, 10000000]
  const prefix = 'VNĐ'
  const min = 1000
  const max = 10000000
  const step = 10

  const [intermediateTextFieldValue, setIntermediateTextFieldValue] = useState(initialValue)
  const [rangeValue, setRangeValue] = useState(initialValue)

  const handleRangeSliderChange = (value) => {
    setRangeValue(value)
    setIntermediateTextFieldValue(value)
  }

  const handleLowerTextFieldChange = useCallback(
    (value) => {
      const upperValue = rangeValue[1]
      setIntermediateTextFieldValue([parseInt(value, 10), upperValue])
    },
    [rangeValue],
  )

  const handleUpperTextFieldChange = useCallback(
    (value) => {
      const lowerValue = rangeValue[0]
      setIntermediateTextFieldValue([lowerValue, parseInt(value, 10)])
    },
    [rangeValue],
  )

  const handleLowerTextFieldBlur = useCallback(() => {
    const upperValue = rangeValue[1]
    const value = intermediateTextFieldValue[0]

    setRangeValue([parseInt(value, 10), upperValue])
  }, [intermediateTextFieldValue, rangeValue])

  const handleUpperTextFieldBlur = useCallback(() => {
    const lowerValue = rangeValue[0]
    const value = intermediateTextFieldValue[1]

    setRangeValue([lowerValue, parseInt(value, 10)])
  }, [intermediateTextFieldValue, rangeValue])

  const lowerTextFieldValue =
    intermediateTextFieldValue[0] === rangeValue[0] ? rangeValue[0] : intermediateTextFieldValue[0]

  const upperTextFieldValue =
    intermediateTextFieldValue[1] === rangeValue[1] ? rangeValue[1] : intermediateTextFieldValue[1]

  return (
    <>
      <div>
        <RangeSlider
          output
          label="Money spent is between"
          value={rangeValue}
          prefix={prefix}
          min={min}
          max={max}
          step={step}
          onChange={handleRangeSliderChange}
        />
        <Stack distribution="equalSpacing" spacing="extraLoose">
          <TextField
            label="Min money spent"
            type="number"
            value={`${lowerTextFieldValue}`}
            prefix={prefix}
            min={min}
            max={max}
            step={step}
            onChange={handleLowerTextFieldChange}
            onBlur={handleLowerTextFieldBlur}
            autoComplete="off"
          />
          <TextField
            label="Max money spent"
            type="number"
            value={`${upperTextFieldValue}`}
            prefix={prefix}
            min={min}
            max={max}
            step={step}
            onChange={handleUpperTextFieldChange}
            onBlur={handleUpperTextFieldBlur}
            autoComplete="off"
          />
        </Stack>
      </div>
    </>
  )
}
