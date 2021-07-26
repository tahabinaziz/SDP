/* 
Copyright (c) 2021 Swift Models Generated from JSON powered by http://www.json4swift.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For support, please feel free to contact me at https://www.linkedin.com/in/syedabsar

*/

import Foundation
struct Quiz : Codable {
	let _id : String?
	let meetingId : String?
	let password : String?
	let title : String?
	let description : String?
	let duration : String?
	let emailRegex : String?
	let date : String?
	let status : String?

	enum CodingKeys: String, CodingKey {

		case _id = "_id"
		case meetingId = "meetingId"
		case password = "password"
		case title = "title"
		case description = "description"
		case duration = "duration"
		case emailRegex = "emailRegex"
		case date = "date"
		case status = "status"
	}

	init(from decoder: Decoder) throws {
		let values = try decoder.container(keyedBy: CodingKeys.self)
		_id = try values.decodeIfPresent(String.self, forKey: ._id)
		meetingId = try values.decodeIfPresent(String.self, forKey: .meetingId)
		password = try values.decodeIfPresent(String.self, forKey: .password)
		title = try values.decodeIfPresent(String.self, forKey: .title)
		description = try values.decodeIfPresent(String.self, forKey: .description)
		duration = try values.decodeIfPresent(String.self, forKey: .duration)
		emailRegex = try values.decodeIfPresent(String.self, forKey: .emailRegex)
		date = try values.decodeIfPresent(String.self, forKey: .date)
		status = try values.decodeIfPresent(String.self, forKey: .status)
	}

}
