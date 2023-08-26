export const templateFormEdit =
    `<div class="container-form-edit">
        <h1 class="form-sentence">Edit Book</h1>
        <form id="commentform-edit" class="comment-form" method="#">
            <div class="form-form">
                <div class="row-input">
                    <input id="name" class="input-field" name="name" type="text" value=""
                           pattern="^[^0-9]+$" size="30" maxlength="245" placeholder=" " required>
                    <label class="input-label" for="name">
                        <span class="label-name">Name</span>
                    </label>
                </div>
                <div class="row-input">
                    <input class="input-field" id="surname" placeholder=" " name="surname" type="text"
                           value="" size="30" maxlength="245" required>
                    <label class="input-label" for="surname" data-help="A girl has no name- Arya Stark">
                        <span class="label-name">Surname</span>
                    </label>
                </div>
                <div class="row-input">
                    <input class="input-field" id="title" placeholder=" " name="Title" type="text"
                           value="" size="30" maxlength="100" aria-describedby="email-notes" required>
                    <label class="input-label" for="title">
                        <span class="label-name">Title</span>
                    </label>
                </div>
                <div class="row-input">
                    <input class="input-field" type="number" id="pages" placeholder=" " name="Pages"
                           required>
                    <label class="input-label" for="pages">
                        <span class="label-name">Pages</span>
                    </label>
                </div>
                <div class="row-input">
                    <input class="input-field" type="number" id="completed_pages" placeholder=" "
                           name="completed_pages" required>
                    <label class="input-label" for="completed_pages">
                        <span class="label-name">Completed Pages</span>
                    </label>
                </div>
                <div class="row-input-read">
                    <label class="form-control">
                        <input id="bookCompletion" type="checkbox" name="checkbox"/>
                        Read?
                    </label>
                </div>
                <div class="form-submit">
                    <input  name="submit" type="submit" id="EditSubmit" class="submit" value="Edit">
                </div>
            </div>
        </form>
    </div>`