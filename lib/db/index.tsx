import { createPool, Pool, RowDataPacket } from "mysql2"

// MySQL 연결 풀 생성
const pool: Pool = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: 3306,
	connectionLimit: 10,
	queueLimit: 0,
})

const executeQuery = <T,>(
	query: string,
	arrParams: any[] = []
): Promise<T[]> => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) {
				console.error("연결 가져오기 오류:", err)
				reject(err)
				return
			}

			conn.query(query, arrParams, (err, data: RowDataPacket[]) => {
				conn.release()

				if (err) {
					console.error("쿼리 실행 오류:", err)
					reject(err)
				} else {
					// RowDataPacket[]을 제네릭 T[]로 변환
					resolve(data as unknown as T[])
				}
			})
		})
	})
}

export default executeQuery
