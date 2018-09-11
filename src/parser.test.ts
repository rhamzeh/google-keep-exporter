import { parse } from "./parser";

describe("Parser", function() {
  test("Should parse some basic info", function() {
    var data = `
		<html><body><div class="note DEFAULT"><div class="heading">
		21 Jun 2016, 22:39:47</div>
		<div class="title">Ll</div>
		<div class="content">Hearts of darkness<br>Water ship down<br>The Dubliners<br><br></div>
		<div class="labels"><span class="label">Reading List</span><span class="label">Another Tag</span></div>
		</div></body></html>
		`;

    var note = parse(Buffer.from(data, "utf8"));
    expect(note.title).toBe("Ll");
    // FIXME: Is the extra space really required?
    expect(note.content).toBe(
      "Hearts of darkness  \nWater ship down  \nThe Dubliners"
    );
    expect(note.tags).toEqual(["Reading List", "Another Tag"]);
    expect(note.archived).toBe(false);
    expect(note.date).toBe("2016-06-21T20:39:47.000Z");
  });
});
