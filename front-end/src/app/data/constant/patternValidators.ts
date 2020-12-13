import {Validators} from '@angular/forms';

export const usernamePatternValidator  = Validators.pattern('^[A-Za-z0-9./*-]*');
