export namespace Member {
	export interface info {
		id: number
		google_id: string
		name: string
		email: string
		nickname?: string
	}
}

export namespace Link {
	export interface info {
		id: number
		member_id: number
		link: string
		link_name: string
		private: number
		created_at: string
		updated_at: string
	}
}
