
        <div class="row">
            <div class="box">
                <div class="col-lg-12">
                    <hr>
                    <h2 class="intro-text text-center">
                        <strong>form</strong>
                    </h2>
                    <hr>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, vitae, distinctio, possimus repudiandae cupiditate ipsum excepturi dicta neque eaque voluptates tempora veniam esse earum sapiente optio deleniti consequuntur eos voluptatem.</p>
                    <form role="form"  method='post'>
                        <div class="row">
                            <div class="form-group col-lg-4">
                                <label>Name</label>
                                <input name='name' type="text" class="form-control required">
                            </div>
                            <div class="form-group col-lg-4">
                                <label>Email Address</label>
                                <input name='email' type="email" class="form-control required email">
                            </div>
                            <div class="form-group col-lg-4">
                                <label>Phone Number</label>
                                <input name='tel' type="tel" class="form-control required number required">
                            </div>
                            <div class="clearfix"></div>
                            <div class="form-group col-lg-12">
                                <label>Message</label>
                                <textarea name='area' class="form-control" rows="6"></textarea>
                            </div>
                            <div class="form-group col-lg-12">
                                <input type="hidden" name="save" value="contact">
                                <button type="submit" class="btn btn-default">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

         <div class="row">
             <div class="box" id="boxi">
             <h2 class="intro-text text-center">
                        <strong>result</strong>
                    </h2>
                 <?php 
                 foreach ($_POST as $key => $value) {
                     if($key != 'ajax_req' && $key != "save") {
                        echo <<<EOF
                          <div class="col-sm-12 text-center">
                              <div class="col-sm-3 text-center">{$key}</div>
                              <div class="col-sm-3 text-center">{$value}</div>
                            </div>
EOF;
                     }
                 }

                 ?>
             </div>
        </div>