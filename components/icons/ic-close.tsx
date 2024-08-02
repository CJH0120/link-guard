import * as React from "react"
import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		width="1em"
		height="1em"
		{...props}
	>
		<defs>
			<style>
				{
					".cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
				}
			</style>
		</defs>
		<title />
		<g id="cross">
			<path d="m7 7 18 18M7 25 25 7" className="cls-1" />
		</g>
	</svg>
)
const IconClose = memo(SvgComponent)
export default IconClose
