<div class="aq" data-section-label="asked-questions">
    <div class="aq__outer questions bookmark-content fixed-mobile-content">

        <div class="aq__inner">
            <div class="aq__container">
                <div class="aq__left slide-to-right animate">
                    <div class="aq__left-inner">

                        <?php  
                   if(have_rows('questions_btns')):
                    while(have_rows('questions_btns')): the_row('');
                   ?>
                        <?php
                        $question_btn = get_sub_field('question_btn');
                        $question_btn_id = strtolower($question_btn);

                        if (strpos($question_btn_id, ' ') !== false) {
                            $question_btn_id = str_replace(' ', '-', $question_btn_id);
                        }
                        ?>
                        <button class="aq__btn txt-14-400"
                            id="<?php echo $question_btn_id; ?>"><?php echo $question_btn; ?></button>

                        <?php endwhile;endif ?>
                    </div>
                </div>
                <div class="aq__right">
                    <div class="aq__right-inner slide-to-left animate">

                        <?php if( have_rows('questions_ask_block') ): ?>
                        <?php $firstBlock = true; ?>
                        <?php  while( have_rows('questions_ask_block') ) : the_row(); ?>

                        <?php
                        $block_id = get_sub_field('block_id');
                        $block_id_lower = strtolower($block_id);

                        if (strpos($block_id_lower, ' ') !== false) {
                            $block_id_lower = str_replace(' ', '-', $block_id_lower);
                        }
                        ?>


                        <div class="aq__block <?php echo $firstBlock ? 'first' : ''; ?>"
                            data-btn-id="<?php echo $block_id_lower; ?>">
                            <div class=" aq__block-head">
                                <span class="aq__block-head-text headline-4">
                                    <?php the_sub_field('headline'); ?>
                                </span>
                            </div>

                            <?php if( have_rows('all_questions') ): ?>
                            <?php  while( have_rows('all_questions') ) : the_row(); ?>
                            <div class="aq__block-item">
                                <div class="aq__block-item-top">
                                    <div class="aq__block-item-question">
                                        <p class="aq__block-item-question-text body-text">
                                            <?php the_sub_field('question'); ?>
                                        </p>
                                    </div>
                                    <div class="aq__block-item-sign to-activate">
                                        <?php print_svg(146); ?>
                                    </div>
                                </div>

                                <div class="aq__block-item-bottom to-activate">
                                    <div class="aq__block-item-bottom-text body-text-very-small">
                                        <?php $field_wysiwyg = get_sub_field('answer'); 
                                            echo $field_wysiwyg;
                                        ?>
                                    </div>
                                </div>

                            </div>
                            <?php $firstBlock = false; ?>
                            <?php endwhile;endif; ?>

                        </div>
                        <?php endwhile;endif; ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>